import { ReactElement, useState } from "react";
import { NextPageWithLayout } from "./_app";
import Layout from "@/components/layout";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { Translation } from "@/types/translation";
import { classNames } from "@/libs/helpers";

const tones = [
  { id: "casual", title: "Casual", checked: false },
  { id: "formal", title: "Formal", checked: false },
  { id: "neutral", title: "Neutral", checked: true },
];

type Inputs = {
  inputLanguage: string;
  outputLanguage: string;
  input: string;
  context: string;
  tone: string;
  audience: string;
};

const schema = yup
  .object({
    inputLanguage: yup.string().required(),
    outputLanguage: yup.string().required(),
    input: yup
      .string()
      .required("Please enter a word, phrase, or sentence to translate."),
    context: yup.string(),
    tone: yup.string().required(),
    audience: yup.string(),
  })
  .required();

const Translate: NextPageWithLayout = () => {
  const [translation, setTranslation] = useState<Translation>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    axios
      .post<ApiResponse<Translation>>("/translations", {
        input_language: data.inputLanguage,
        output_language: data.outputLanguage,
        input: data.input,
        context: data.context,
        tone: data.tone,
        audience: data.audience,
        requires_explaination: false,
        requires_example: false,
      })
      .then((response) => {
        setTranslation(response.data.data);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold">Translate</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Select the language
            </label>
            <div className="mt-2 flex">
              <select
                {...register("inputLanguage")}
                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue="English"
              >
                <option>English</option>
                <option>Japanese</option>
                <option>Chinese</option>
              </select>

              <div className="mx-6 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>

              <select
                {...register("outputLanguage")}
                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue="Japanese"
              >
                <option>English</option>
                <option>Japanese</option>
                <option>Chinese</option>
              </select>
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="input"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Word, phrase, or sentence to translate
            </label>
            <div className="mt-2">
              <textarea
                {...register("input")}
                id="input"
                rows={3}
                className={classNames(
                  "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
                  errors.input && "text-red-900 ring-red-300 focus:ring-red-500"
                )}
                defaultValue={""}
              />
            </div>
            <p className="mt-2 text-sm text-red-600">{errors.input?.message}</p>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              This could be anything from a single word to a complex sentence.
            </p>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="context"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Context{" "}
              <span className="text-sm leading-6 text-gray-500">
                (optional)
              </span>
            </label>
            <div className="mt-2">
              <textarea
                {...register("context")}
                id="context"
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={""}
                placeholder="Requesting a day off from work"
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Help us understand the context or situation where you'll be using
              this translation. This will greatly improve the accuracy of the
              translation.
            </p>
          </div>

          <div className="sm:col-span-full">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Tone
            </label>
            <fieldset className="mt-2">
              <legend className="sr-only">Tone</legend>
              <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                {tones.map((tone) => (
                  <div key={tone.id} className="flex items-center">
                    <input
                      {...register("tone")}
                      id={tone.id}
                      value={tone.id}
                      type="radio"
                      defaultChecked={tone.checked}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor={tone.id}
                      className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                    >
                      {tone.title}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="audience"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Audience{" "}
              <span className="text-sm leading-6 text-gray-500">
                (optional)
              </span>
            </label>
            <div className="mt-2">
              <input
                {...register("audience")}
                id="audience"
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Friend"
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Specify who will be receiving your message. This could impact the
              word choices and level of formality in the translation.
            </p>
          </div>

          <div className="col-span-full">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Translate
            </button>
          </div>
        </div>
      </form>

      {/* Render the translation here */}
      {translation && <div>{translation.translation}</div>}
    </div>
  );
};

Translate.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Translate;
