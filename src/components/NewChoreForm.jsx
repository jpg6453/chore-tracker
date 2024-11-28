/* eslint-disable react/prop-types */
const NewChoreForm = ({
  handleSubmit,
  text,
  date,
  amount,
  setText,
  setDate,
  setAmount,
  setShowForm,
  setError,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Chore details"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="number"
          value={amount}
          min="0"
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter an amount"
        />

        <button>Add Chore</button>
      </form>
      <button
        onClick={() => {
          setShowForm(false);
          setError(false);
        }}
        className="back-to-chores"
      >
        Back to Chores
      </button>
    </div>
  );
};

export default NewChoreForm;
