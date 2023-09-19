/* eslint-disable react/prop-types */
const PersonForm = ({ onSubmit, name, number}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name:{" "}
        <input
          onChange={name.handleNameChange}
          value={name.newName}
          aria-label="enter name"
        />
      </div>
      <div>
        number:{" "}
        <input
          onChange={number.handleNumberChange}
          value={number.newNumber}
          aria-label="enter number"
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;