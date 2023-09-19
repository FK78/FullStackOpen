/* eslint-disable react/prop-types */
const Filter = ({ onChange, search }) => {
  return (
    <form>
      show numbers with: {""}
      <input
        onChange={onChange}
        value={search}
        aria-label="enter number you want to search for"
      />
    </form>
  );
};

export default Filter;
