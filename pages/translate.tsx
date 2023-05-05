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
      <h1 className="mb-4 text-2xl font-bold">Context-aware Translation</h1>

      <div className="rounded bg-white p-6 shadow">
        <label className="mb-2 block">Text to translate</label>
        <input
          type="text"
          className="mb-4 w-full rounded border p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <label className="mb-2 block">Context</label>
        <input
          type="text"
          className="mb-4 w-full rounded border p-2"
          value={context}
          onChange={(e) => setContext(e.target.value)}
        />

        <label className="mb-2 block">Tone:</label>
        <div className="mb-4 flex items-center">
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
          className="rounded bg-blue-500 px-4 py-2 text-white"
          onClick={onSubmit}
        >
          Translate
        </button>
      </div>

      {/* Render your translations output here */}
    </div>
  );
}
