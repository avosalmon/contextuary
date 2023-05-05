import { useState } from "react";

export default function Translate() {
  const [input, setInput] = useState<string>("");
  const [context, setContext] = useState<string>("");
  const [tone, setTone] = useState("formal");

  const onSubmit = () => {
    // Implement your translation logic here
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Context-aware Translation</h1>

      <div className="bg-white p-6 rounded shadow">
        <label className="block mb-2">Text to translate</label>
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <label className="block mb-2">Context</label>
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded"
          value={context}
          onChange={(e) => setContext(e.target.value)}
        />

        <label className="block mb-2">Tone:</label>
        <div className="flex items-center mb-4">
          <input
            type="radio"
            id="formal"
            name="tone"
            value="formal"
            checked={tone === "formal"}
            onChange={(e) => setTone(e.target.value)}
            className="mr-2"
          />
          <label htmlFor="formal" className="mr-4">
            Formal
          </label>
          <input
            type="radio"
            id="informal"
            name="tone"
            value="informal"
            checked={tone === "informal"}
            onChange={(e) => setTone(e.target.value)}
            className="mr-2"
          />
          <label htmlFor="informal">Informal</label>
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={onSubmit}
        >
          Translate
        </button>
      </div>

      {/* Render your translations output here */}
    </div>
  );
};
