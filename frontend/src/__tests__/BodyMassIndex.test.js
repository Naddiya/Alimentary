import React from "react";
import BodyMassIndexForm from "../components/tools/forms/BodyMassIndexForm";
import { calculateBmi } from "../calculations/bodyMassIndexCalculation";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

afterEach(cleanup);
describe("BodyMassIndex", () => {
  it("should be rendered properly", () => {
    const { container } = render(<BodyMassIndexForm />);

    container.querySelector("#bmi");
    container.querySelector("#weight");
    container.querySelector("#height");

    screen.getByRole("heading", {
      name: /Calculer l'indice de masse corporelle/i,
    });
    screen.getByRole("button", { name: /Calcul du BMI/i });
    screen.getByRole("button", { name: /Initialiser/i });
    screen.getByLabelText(/Taille/i);
    screen.getByLabelText(/Poids/i);
    screen.getByText(/Resultat/i);
  });
});

describe("button calculate", () => {
  it("should call props.onClick when clicked", () => {
    const mockedCalculate = jest.fn();
    const { getByText } = render(
      <button onClick={mockedCalculate}>Calcul du BMI</button>
    );
    fireEvent.click(getByText(/Calcul du BMI/i));
    expect(mockedCalculate).toHaveBeenCalledTimes(1);
  });
});

describe("button clear", () => {
  it("should call props.onClick when clicked", () => {
    const mockedClearForm = jest.fn();
    const { getByText } = render(
      <button onClick={mockedClearForm}>Initialiser</button>
    );
    fireEvent.click(getByText(/Initialiser/i));
    expect(mockedClearForm).toHaveBeenCalledTimes(1);
  });
});

describe("calculate weight", () => {
  test("height = 172 and weight = 116 should returns 31.29", () => {
    expect(calculateBmi(116, 172)).toEqual(39.21);
  });
  test("height is undefined or weight is undefined returns 0", () => {
    expect(calculateBmi(undefined, 172)).toEqual(0);
  });
});