import { convertYouTubeToEmbed } from "@/lib/utils";

const YouTubeEmbed = ({ url }: { url: string }) => {
  const embedUrl = convertYouTubeToEmbed(url);
  if (!embedUrl) return <p>Invalid YouTube link</p>;

  return (
    <iframe
      width="100%"
      height="100%"
      src={embedUrl}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};

export default YouTubeEmbed;
