export default function GradientSection() {
  return (
    <div className="hidden w-1/2 items-center justify-around bg-gradient-to-tr from-[#F86CA7] to-[#F4D444] sm:flex">
      <div>
        <h1 className="font-sans text-3xl font-bold text-white lg:text-4xl">
          NextJS Auth App
        </h1>
        <p className="mt-1 text-white">A learning demo for NextJs</p>
        <button
          type="submit"
          className="mb-2 mt-4 block w-28 rounded-2xl bg-white py-2 font-bold text-orange-400"
        >
          Github ~
        </button>
      </div>
    </div>
  );
}
