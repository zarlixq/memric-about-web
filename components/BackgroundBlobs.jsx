export default function BackgroundBlobs() {
  return (
    <>
      <div className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 sm:w-96 sm:h-96 bg-pink-400 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-pulse" />
      <div className="pointer-events-none absolute top-40 -right-20 w-72 h-72 sm:w-96 sm:h-96 bg-pink-500 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-pulse" />
    </>
  );
}
