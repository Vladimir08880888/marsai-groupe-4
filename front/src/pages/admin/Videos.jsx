import { useQuery } from "@tanstack/react-query";
import { getVideos, deleteVideo } from "../../api/videos.js";
import { useState, Fragment } from "react";
import { useMutation } from "@tanstack/react-query";
import { 
  flexRender, 
  getCoreRowModel, 
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { YouTubePlayer } from "@/components/ui/youtube-video-player.jsx";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function Videos() {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedVideoId, setExpandedVideoId] = useState(null);
  const [sorting, setSorting] = useState([]);
  const limit = 10;

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["films", currentPage, limit],
    queryFn: () => getVideos(currentPage, limit),
    keepPreviousData: true,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await deleteVideo(id);
    },
    onSuccess: (data, variables, context) => {
      window.location.reload();
    },
    onError: (error) => {
      alert('Erreur lors de la supression: ' + (error.response?.data?.error || error.message));
    }
  });

  function handleDelete(id) {
    if (confirm("Voulez-vous vraiment supprimer cet video ?")) {
      deleteMutation.mutate(id);
    }
  }

  const toggleVideoExpand = (videoId) => {
    setExpandedVideoId(expandedVideoId === videoId ? null : videoId);
  };

  const columns = [
    {
      accessorKey: "title",
      header: "Titre",
      cell: ({ row }) => {
        const video = row.original;
        const isExpanded = expandedVideoId === video.id;
        return (
          <button
            onClick={() => toggleVideoExpand(video.id)}
            className="flex items-center gap-2 text-left hover:text-blue-600 transition-colors"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
            <span className="font-medium hover:cursor-pointer">{video.title}</span>
          </button>
        );
      },
    },
    {
      accessorKey: "user",
      header: "Propriétaire",
      cell: ({ row }) => {
        const user = row.original.user;
        return user ? `${user.first_name} ${user.last_name}` : "N/A";
      },
    },
    {
      accessorKey: "user.email",
      header: "Email",
      cell: ({ row }) => row.original.user?.email || "N/A",
    },
    {
      accessorKey: "created_at",
      header: "Date de création",
      cell: ({ row }) => {
        const date = new Date(row.getValue("created_at"));
        return date.toLocaleDateString("fr-FR");
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const video = row.original;
        return (
          <div className="flex gap-2 justify-end">
            <Button 
              variant="outline"
              size="sm"
              onClick={() => console.log("Edit video:", video.id)} className="hover:cursor-pointer"
            >
              Modifier
            </Button>
            <Button 
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(video.id)} className="hover:cursor-pointer"
            >
              Supprimer
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data?.data?.showVideos || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  // Handle loading and error states AFTER all hooks
  if (isPending) {
    return <div className="container mx-auto px-4 py-8">Chargement en cours...</div>;
  }

  if (isError) {
    return <div className="container mx-auto px-4 py-8">Une erreur est survenue : {error.message}</div>;
  }

  console.log("Video data received:", data);
  console.log("showVideos array:", data?.data?.showVideos);

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Liste des vidéos</h2>
        </div>

        {data.data.showVideos.length > 0 ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => {
                    const video = row.original;
                    const isExpanded = expandedVideoId === video.id;
                    return (
                      <Fragment key={row.id}>
                        <TableRow>
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                        {isExpanded && (
                          <TableRow>
                            <TableCell colSpan={columns.length} className="bg-gray-50">
                              <div className="p-4 space-y-4">
                                <div className="max-w-4xl">
                                  <YouTubePlayer
                                    videoId={video.youtube_link}
                                    title={video.title}
                                    customThumbnail={
                                      video.thumbnail
                                        ? `http://localhost:3000/uploads/images/${video.thumbnail}`
                                        : "http://localhost:3000/uploads/images/thumbnail-placeholder.png"
                                    }
                                    defaultExpanded={true}
                                    className="mb-4"
                                  />
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold text-gray-700 mb-2">Synopsis</h4>
                                    <p className="text-gray-600">{video.synopsis || "Aucun synopsis disponible"}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-gray-700 mb-2">Outils IA utilisés</h4>
                                    <p className="text-gray-600">{video.ai_tools || "Non spécifié"}</p>
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </Fragment>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      Aucune vidéo trouvée.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">Aucune vidéo à afficher.</div>
        )}

        {data.data.totalPages > 1 && (
          <Pagination className="mt-6">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {Array.from({ length: data.data.totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, data.data.totalPages))}
                  className={currentPage === data.data.totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </section>
  );
}

export default Videos;
