import "./App.css";
import { useReducer } from "react";
import logo from "./loupe.svg";

const initial = [
  {
    text: "text 1",
    checked: false,
  },
  {
    text: "text 2",
    checked: false,
  },
];

function handleReducer(state, action) {
  switch (action.type) {
    case "setAdd":
      return { ...state, addValue: action.value };
    case "setTemp":
      return { ...state, temp: action.value };
    case "handleClick":
      return {
        ...state,
        temp: action.tempValue,
        all: action.allValue,
        addValue: action.value,
      };
    case "handleDelete":
      return {
        ...state,
        temp: action.tempValue,
        all: action.allValue,
        completed: action.completedValue,
        active: action.activeValue,
      };
    case "handleAll":
      return { ...state, temp: action.tempValue, btns: action.btnsValue };
    case "handleActive":
      return { ...state, temp: action.tempValue, btns: action.btnsValue };
    case "handleCompleted":
      return { ...state, temp: action.tempValue, btns: action.btnsValue };
    case "handleMouseDownSearch":
      return { ...state, visible: action.visibleValue };
    case "handleSearchQuery":
      return { ...state, searchQuery: action.searchQueryValue };
    default:
      console.error("Action Error");
      break;
  }
}

function App() {
  const [state, dispatch] = useReducer(handleReducer, {
    addValue: "",
    temp: initial,
    btns: [true, false, false],
    all: initial,
    completed: [],
    active: [],
    visible: false,
    searchQuery: "",
  });

  function handleChange(event) {
    dispatch({
      type: "setAdd",
      value: event.target.value,
    });
  }

  function handleClick() {
    dispatch({
      type: "handleClick",
      tempValue: [{ text: state.addValue, checked: false }, ...state.all],
      allValue: [{ text: state.addValue, checked: false }, ...state.all],
      value: "",
    });
  }

  function handleDelete(event) {
    const index = parseInt(event.target.id);
    const updatedTemp = state.temp.map((ele, i) => {
      if (i === index) {
        return { ...ele, checked: !ele.checked };
      } else {
        return ele;
      }
    });
    const updatedAll = updatedTemp.filter((ele) => ele !== null);
    const updatedCompleted = updatedAll.filter((ele) => ele.checked);
    const updatedActive = updatedAll.filter((ele) => !ele.checked);
    dispatch({
      type: "handleDelete",
      tempValue: updatedTemp,
      allValue: updatedAll,
      completedValue: updatedCompleted,
      activeValue: updatedActive,
    });
  }

  function handleAll() {
    dispatch({
      type: "handleAll",
      tempValue: state.all.filter((ele) =>
        ele.text.toLowerCase().includes(state.searchQuery.toLowerCase())
      ),
      btnsValue: state.btns[0] ? state.btns : [true, false, false],
    });
  }

  function handleActive() {
    dispatch({
      type: "handleActive",
      tempValue: state.active.filter((ele) =>
        ele.text.toLowerCase().includes(state.searchQuery.toLowerCase())
      ),
      btnsValue: state.btns[1] ? state.btns : [false, true, false],
    });
  }

  function handleCompleted() {
    dispatch({
      type: "handleCompleted",
      tempValue: state.completed.filter((ele) =>
        ele.text.toLowerCase().includes(state.searchQuery.toLowerCase())
      ),
      btnsValue: state.btns[2] ? state.btns : [false, false, true],
    });
  }

  function handleMouseDownSearch(event) {
    dispatch({
      type: "handleMouseDownSearch",
      visibleValue: state.visible ? false : true,
    });
    if (state.visible) {
      event.target.style.color = "rgba(255, 255, 255, 0.304)";
    } else {
      event.target.style.color = "white";
    }
  }
  function handleSearchQuery(event) {
    dispatch({
      type: "handleSearchQuery",
      searchQueryValue: event.target.value,
    });
  }

  return (
    <div id="body-id">
      <h1>ToDo List</h1>
      <hr id="hr1-id" />
      <div id="add">
        <div className="inputContainer">
          <input
            placeholder="&nbsp;Add"
            onChange={handleChange}
            value={state.addValue}
            id="input-id"
          ></input>
        </div>
        <button id="addBtn" onClick={handleClick}>
          +
        </button>
      </div>
      <ul>
        {state.temp
          .filter((ele) =>
            ele.text.toLowerCase().includes(state.searchQuery.toLowerCase())
          )
          .map((ele, i) => (
            <li id={i + "li"} key={i} onMouseDown={handleDelete}>
              <input
                name="cssCheckbox"
                id={i}
                type="checkbox"
                className="css-checkbox"
                checked={ele.checked}
              />
              <label
                htmlFor={i}
                id={i + "l"}
                className={ele.checked ? "text-with-line" : "text-with-no-line"}
              >
                &nbsp;{ele.text}
              </label>
            </li>
          ))}
      </ul>
      <div className="bottomBtnContainer">
        <button
          className={state.btns[0] ? "bottomBtn active" : "bottomBtn"}
          onMouseDown={handleAll}
        >
          All
        </button>
        <button
          className={state.btns[1] ? "bottomBtn active" : "bottomBtn"}
          onMouseDown={handleActive}
        >
          Active
        </button>
        <button
          className={state.btns[2] ? "bottomBtn active" : "bottomBtn"}
          onMouseDown={handleCompleted}
        >
          Completed
        </button>
      </div>
      <div className="searchBarContainer">
        <button
          className="bottomBtn searchBar"
          onMouseDown={handleMouseDownSearch}
        >
          <img src={logo} alt="logo" id="sb" />
        </button>
        <input
          style={{
            opacity: state.visible ? "1" : "0",
            transition: "opacity 0.05s ease-out",
          }}
          type="search"
          className="searchInput"
          placeholder="&nbsp;Search"
          value={state.searchQuery}
          onChange={handleSearchQuery}
        />
      </div>
    </div>
  );
}

export default App;
