export default function Loader() {
  return (
    <div
      className="flex justify-center items-center animate-spin  w-10 h-10 border-[3px] border-current border-t-transparent text-orange-400 rounded-full"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
