export default function InputField({
  type,
  name,
  placeholder,
  onChange,
  value,
}: {
  type: string;
  name: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  value: string
}) {
  return (
    <div className="mb-4 flex items-center rounded-2xl border-2 px-3 py-2 hover:border-orange-300 text-gray-600">
      <input
        className="border-none pl-2 outline-none"
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
        value={value}
      />
    </div>
  );
}
