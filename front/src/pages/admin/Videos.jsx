import { useQuery } from "@tanstack/react-query";
import { getVideos } from "../../api/videos.js";

//shadcn components
import { YouTubePlayer, YouTubePlayerControls } from "@/components/ui/youtube-video-player.jsx";



function Videos() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["films"],
    queryFn: getVideos,
  });

  if (isPending) {
    return <div>Chargement en cours...</div>;
  }

  if (isError) {
    return <div>Une erreur est survenue : {error.message}</div>;
  }

  return data.data.showVideos.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 p-8 max-w-7xl mx-auto">
      {data.data.showVideos.map((video) => (
        <div key={video.id || video.title}>
			<h2 className="text-2xl font-bold">{video.title}</h2>
            <YouTubePlayer
              	videoId={video.youtube_link}
              title={video.title}
              customThumbnail={video.thumbnail ? `http://localhost:3000/images/${video.thumbnail}` : "http://localhost:3000/images/thumbnail-placeholder.png"}
              defaultExpanded={false}
              // Container styling
              className="mb-8"
              containerClassName="border-2 border-gradient rounded-xl overflow-hidden shadow-lg"
              expandedClassName="border-none shadow-2xl"
              // Thumbnail styling
              thumbnailClassName="bg-gradient-to-br from-blue-500/20 to-purple-500/20"
              thumbnailImageClassName="opacity-80 transition-opacity hover:opacity-100"
              // Play button styling
              playButtonClassName="bg-white/90 hover:bg-white border-2 border-blue-500 shadow-lg"
              playIconClassName="text-blue-500 fill-blue-500"
              // Title styling
              titleClassName="text-white font-bold text-lg drop-shadow-lg"
              // Controls styling
              controlsClassName="right-3 top-3"
              expandButtonClassName="bg-black/50 hover:bg-black/70 border border-white/20"
              // Modal styling
              backdropClassName="bg-black/60 backdrop-blur-md"
              playerClassName="bg-black rounded-lg"
            />
			<YouTubePlayerControls
				videoId={video.youtube_link}
				expanded={false}
				playing={false}
				isHovered={true}
				onToggleExpand={() => {
				}}
				controlsClassName="custom-controls"
				expandButtonClassName="custom-expand-btn"
				/>
			<div>
				<p><strong>Propriétaire:</strong> {video.user ? `${video.user.first_name} ${video.user.last_name}` : 'N/A'}</p>
				<p><strong>Email:</strong> {video.user?.email || 'N/A'}</p>
				<p>{video.synopsis}</p>
				<label>{video.ai_tools}</label>
				<label><small>{video.created_at}</small></label>
			</div>
        </div>
      ))}
    </div>
  ) : (
    <div>Aucune vidéo à afficher.</div>
  );
}

export default Videos;
