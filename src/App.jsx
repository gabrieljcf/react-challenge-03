import { useState } from "react";

function App() {
  const MAX_PROGRESS_VALUE = 100;
  const REGEX_TO_VALIDATE_EMAIL =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const stateWithValidation = [
    'fullName',
    'email'
  ]
    const [data, setData] = useState({
    fullName: "",
    email: "",
    maritalStatus: "",
    genre: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidName = (fullName) => fullName.split(" ")[1];

  const isValidEmail = (email) => REGEX_TO_VALIDATE_EMAIL.test(email);

  const isValidForm = () => calculateProgress() === MAX_PROGRESS_VALUE;

  const calculateProgress = () => {
    const ammountToAdd = MAX_PROGRESS_VALUE / Object.keys(data).length;
    const progress = Object.keys(data).reduce((percentage, key) => {
      if (key === 'fullName' && isValidName(data[key])) percentage += ammountToAdd;
      if (key === 'email' && isValidEmail(data[key])) percentage += ammountToAdd;
      if (!stateWithValidation.includes(key) && data[key]) percentage += ammountToAdd;
      return percentage
    }, 0)
    return progress;
  };

  const handleSubmit = () => {
    alert("Form sent successfully!");
    setData({
      fullName: "",
      email: "",
      maritalStatus: "",
      genre: "",
    });
  };

  return (
    <div className="App">
      <h3>React Challenge</h3>
      <h1>Progress Form</h1>

      <main>
        <div className="bar-container">
          <div
            className="bar"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
        <div className="form-group">
          <label htmlFor="">Nome Completo</label>
          <input
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">E-mail</label>
          <input name="email" value={data.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="">Estado Civil</label>
          <select
            value={data.maritalStatus}
            onChange={handleChange}
            name="maritalStatus"
          >
            <option value="">- selecione...</option>
            <option value="solteiro">Solteiro</option>
            <option value="casado">Casado</option>
            <option value="divorciado">Divorciado</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="">Gênero</label>
          <div className="radios-container">
            <span>
              <input
                type="radio"
                name="genre"
                value="male"
                onChange={handleChange}
                checked={data.genre === "male"}
              />{" "}
              Masculino
            </span>
            <span>
              <input
                type="radio"
                name="genre"
                value="female"
                onChange={handleChange}
                checked={data.genre === "female"}
              />{" "}
              Feminino
            </span>
          </div>
        </div>
        <button disabled={!isValidForm()} onClick={handleSubmit}>
          Enviar Formulário
        </button>
      </main>
    </div>
  );
}

export default App;
