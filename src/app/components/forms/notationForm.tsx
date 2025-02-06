import { Prisma } from "@prisma/client";
import Form from "next/form";
import { ChangeEvent } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../buttons/buttons";

interface NotationFormProps {
  pages: string[];
  texts: Prisma.TextNotationGetPayload<true>[];
  textUpdate: Prisma.TextNotationGetPayload<true> | undefined;
  selectedType: string;
  selectedPage: string;
  selectedOrder: string | number;
  update: boolean;
  handleChangeType: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleChangePage: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleOrder: () => void;
  handleOptionUpdateChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleSubmit: (formData: FormData) => void;
}

export function NotationForm({
  pages,
  texts,
  textUpdate,
  selectedType,
  selectedPage,
  selectedOrder,
  update,
  handleChangeType,
  handleChangePage,
  handleOrder,
  handleOptionUpdateChange,
  handleSubmit,
}: NotationFormProps) {
  const BtnSubmit = () => {
    const { pending } = useFormStatus();

    return (
      <Button
        type="submit"
        theme="primary"
        size="sm"
        className="w-fit place-self-center"
        disabled={pending}
      >
        Valider
      </Button>
    );
  };

  return (
    <Form action={handleSubmit} className="form ">
      <h2 className="h2-form">Texte avec Notation</h2>

      <label htmlFor="id" className="label-form">
        Sélectioner le texte à modifier
        <select
          name="id"
          id="id"
          onChange={handleOptionUpdateChange}
          disabled={!update}
          value={textUpdate?.id || ""}
        >
          <option value="" disabled>
            Sélectionnez un texte
          </option>
          {texts.map((text) => (
            <option key={text.order} value={text.id}>
              {`${text.page} - ${text.order} - ${text.type} - ${text.textNotation} - ${text.text}`}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="page" className="label-form">
        Sélectioner la page
        <select
          name="page"
          id="page"
          value={selectedPage}
          onChange={handleChangePage}
        >
          {pages.map((page) => (
            <option key={page} value={page}>
              {page}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="type" className="label-form">
        Sélection du type de notation
        <select
          name="type"
          id="type"
          value={selectedType}
          onChange={handleChangeType}
        >
          <option value="underline">Underline</option>
          <option value="highlight">Highlight</option>
          <option value="box">Box</option>
          <option value="circle">Circle</option>
          <option value="crossed">Crossed</option>
          <option value="bracket">Bracket</option>
        </select>
      </label>

      <label htmlFor="order" className="label-form">
        Ordre
        <input
          type="number"
          name="order"
          id="order"
          placeholder="Enter order"
          value={selectedOrder}
          onChange={handleOrder}
        />
      </label>

      <label htmlFor="textNotation" className="label-form">
        Texte Notation
        <input
          type="textNotation"
          name="textNotation"
          id="textNotation"
          placeholder="Enter text notation"
          defaultValue={
            textUpdate?.textNotation ? textUpdate.textNotation : undefined
          }
        />
      </label>

      <label htmlFor="text" className="label-form">
        Texte
        <input
          type="text"
          name="text"
          id="text"
          placeholder="Enter text"
          defaultValue={textUpdate?.text ? textUpdate.text : undefined}
        />
      </label>

      <BtnSubmit />
    </Form>
  );
}
