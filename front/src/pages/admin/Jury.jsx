import { useEffect, useState } from "react";
import { getJurys, createJury, updateJury, deleteJury } from "../../api/jury.js";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import FormField from "@/components/FormField";

const jurySchema = z.object({
  id: z.preprocess((val) => {
        if (val === "" || val === undefined || val === null) return undefined;
        return Number(val);
    }, z.number().optional()),
  first_name: z.string().min(1, "Le prénom est requis"),
  last_name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  password: z.string().optional(),
});

function Jury() {
  const [jurys, setJurys] = useState([]);
  const [modeEdit, setModeEdit] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sorting, setSorting] = useState([]);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    getJurys().then((data) => {
      // Filter only JURY role users
      const juryUsers = data.data.filter(user => user.role === "JURY");
      setJurys(juryUsers);
    });
  }, []);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(jurySchema),
  });

  const createMutation = useMutation({
    mutationFn: async (newJury) => {
      return await createJury(newJury);
    },
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error) => {
      console.error('Error creating jury:', error);
      setServerError(error.response?.data?.error || "Erreur lors de la création");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedJury) => {
      return await updateJury(updatedJury.id, updatedJury);
    },
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error) => {
      console.error('Error updating jury:', error);
      setServerError(error.response?.data?.error || "Erreur lors de la mise à jour");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await deleteJury(id);
    },
    onSuccess: () => {
      window.location.reload();
    },
  });

  function onSubmit(data) {
    setServerError(""); // Clear previous errors
    
    // Validate password for create mode
    if (!modeEdit && (!data.password || data.password.length < 6)) {
      setServerError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }
    
    // Don't send empty password in edit mode
    if (modeEdit && !data.password) {
      const { password, ...dataWithoutPassword } = data;
      return updateMutation.mutate(dataWithoutPassword);
    }
    
    if (modeEdit && data.id) {
      return updateMutation.mutate(data);
    } else {
      return createMutation.mutate(data);
    }
  }

  function handleEdit(jury) {
    setValue("id", jury.id);
    setValue("first_name", jury.first_name);
    setValue("last_name", jury.last_name);
    setValue("email", jury.email);
    setValue("password", "");
    setIsDialogOpen(true);
    setModeEdit(true);
  }

  function handleReset() {
    setValue("id", undefined);
    setValue("first_name", "");
    setValue("last_name", "");
    setValue("email", "");
    setValue("password", "");
    setServerError("");
    setIsDialogOpen(false);
    setModeEdit(false);
  }

  function handleDelete(id) {
    if (confirm("Voulez-vous vraiment supprimer ce membre du jury ?")) {
      deleteMutation.mutate(id);
    }
  }

  const columns = [
    {
      accessorKey: "first_name",
      header: "Prénom",
    },
    {
      accessorKey: "last_name", 
      header: "Nom",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const jury = row.original;
        return (
          <div className="flex gap-2 justify-end">
            <Button 
              variant="outline"
              size="sm"
              onClick={() => handleEdit(jury)}
            >
              Modifier
            </Button>
            <Button 
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(jury.id)}
            >
              Supprimer
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: jurys,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Membres du Jury</h2>
          <Dialog open={isDialogOpen && !modeEdit} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) handleReset();
          }}>
            <DialogTrigger asChild>
              <Button>Ajouter un membre du jury</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Ajouter un membre du jury</DialogTitle>
                <DialogDescription>
                  Remplissez les informations pour créer un nouveau membre du jury
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input type="hidden" {...register("id")} />
                
                {serverError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    <p className="font-medium">{serverError}</p>
                  </div>
                )}
                
                {Object.keys(errors).length > 0 && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    <p className="font-medium">Erreurs de validation:</p>
                    <ul className="list-disc list-inside">
                      {Object.entries(errors).map(([key, error]) => (
                        <li key={key}>{error.message}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Prénom" id="first_name" register={register} required />
                  <FormField label="Nom" id="last_name" register={register} required />
                  <FormField label="Email" id="email" type="email" register={register} required />
                  <FormField label="Mot de passe" id="password" type="password" register={register} required />
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={handleReset}>
                    Annuler
                  </Button>
                  <Button type="submit">
                    Créer
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Edit Dialog */}
        <Dialog open={isDialogOpen && modeEdit} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) handleReset();
        }}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Modifier un membre du jury</DialogTitle>
              <DialogDescription>
                Modifiez les informations du membre du jury
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input type="hidden" {...register("id")} />
              
              {serverError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  <p className="font-medium">{serverError}</p>
                </div>
              )}
              
              {Object.keys(errors).length > 0 && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  <p className="font-medium">Erreurs de validation:</p>
                  <ul className="list-disc list-inside">
                    {Object.entries(errors).map(([key, error]) => (
                      <li key={key}>{error.message}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Prénom" id="first_name" register={register} required />
                <FormField label="Nom" id="last_name" register={register} required />
                <FormField label="Email" id="email" type="email" register={register} required />
                <FormField label="Mot de passe (laisser vide pour ne pas changer)" id="password" type="password" register={register} />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleReset}>
                  Annuler
                </Button>
                <Button type="submit">
                  Enregistrer
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {jurys.length > 0 ? (
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
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      Aucun membre du jury trouvé.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            Aucun membre du jury à afficher.
          </div>
        )}
      </div>
    </section>
  );
}

export default Jury;