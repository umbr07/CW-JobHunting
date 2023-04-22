import { makeAutoObservable } from "mobx";

export default class VacancyStore {
  constructor() {
    this._type = [
      { id: 1, name: "Back-end" },
      { id: 2, name: "Fron-end" },
      { id: 3, name: "DevOP" },
      { id: 2, name: "Data Analysis" },
    ];
    this._user = {};
    makeAutoObservable(this);
    this._vacancy = [
      {
        id: 1,
        name: "Back-end Develorep",
        salary: "2000$",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in.",
      },
      {
        id: 2,
        name: "Back-end Develorep",
        salary: "1600$",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in.",
      },
      {
        id: 3,
        name: "Back-end Develorep",
        salary: "2400$",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in.",
      },
      {
        id: 4,
        name: "Back-end Develorep",
        salary: "2300$",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in.",
      },
    ];
  }

  setTypes(types) {
    this._types = types;
  }

  get types() {
    return this._types;
  }
}
