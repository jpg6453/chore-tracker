import { useEffect, useState } from 'react';
// components
import Chore from './Chore';
import NewChoreForm from './NewChoreForm';

const ChoreList = () => {
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [chores, setChores] = useState(() => {
    const storedChores = localStorage.getItem('chores');
    if (storedChores == null) return [];
    return JSON.parse(storedChores);
  });
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === '' || date === '' || amount === '') {
      setError(true);
      return;
    }
    addChore();
    setShowForm(false);
    setError(false);
  };

  // add a new chore
  const addChore = () => {
    const newChore = {
      id: Date.now(),
      text,
      date,
      amount,
      completed: false,
      toBeDeleted: false,
    };
    setChores([newChore, ...chores]);
    // localStorage.setItem('chores', JSON.stringify([newChore, ...chores]));
    setText('');
    setDate('');
    setAmount('');
  };

  // save chores to local storage
  useEffect(() => {
    localStorage.setItem('chores', JSON.stringify(chores));
  }, [chores]);

  //toggle completed
  const toggleComplete = (id) => {
    const completedChores = chores.map((chore) =>
      chore.id === id ? { ...chore, completed: !chore.completed } : chore
    );

    //sort
    const sortedChores = completedChores.sort(
      (a, b) => a.completed - b.completed
    );
    setChores(sortedChores);
  };

  // delete chore
  const deleteChore = (id) => {
    setChores(chores.filter((chore) => chore.id !== id));
  };
  const confirmDelete = (id) => {
    const choresToDelete = chores.map((chore) =>
      chore.id === id ? { ...chore, toBeDeleted: !chore.toBeDeleted } : chore
    );
    setChores(choresToDelete);
  };

  //completed messages

  const numberComplete = chores.filter((chore) => chore.completed).length;
  const numberTotal = chores.length;

  const getMessage = () => {
    const percentage = (numberComplete / numberTotal) * 100;
    if (percentage === 0) {
      return 'Time to make a start on your chores! ';
    }
    if (percentage === 100) {
      return 'Nice job, no chores left to do for now!';
    }
    return 'You are off to a great start...';
  };

  //Move Up /Down

  const moveUp = (index) => {
    if (index > 0) {
      const updatedChores = [...chores];
      [updatedChores[index], updatedChores[index - 1]] = [
        updatedChores[index - 1],
        updatedChores[index],
      ];
      setChores(updatedChores);
    }
  };
  const moveDown = (index) => {
    if (index < chores.length - 1) {
      const updatedChores = [...chores];
      [updatedChores[index], updatedChores[index + 1]] = [
        updatedChores[index + 1],
        updatedChores[index],
      ];
      setChores(updatedChores);
    }
  };

  const renameChore = (index, newName) => {
    setChores((prev) => {
      const newChores = [...prev];
      newChores[index].text = newName;
      return newChores;
    });
  };

  return (
    <>
      <div className="wrapper">
        <h1>{showForm ? 'Enter Chore Details' : "Connor's Chore List"}</h1>
        {!showForm && (
          <div>
            <h2>
              {numberComplete}/{numberTotal} Completed
            </h2>
            {chores.length > 0 && <h3>{getMessage()}</h3>}

            <button
              onClick={() => {
                setShowForm(true);
              }}
            >
              Add more chores
            </button>
          </div>
        )}
        {error && <h4 className="form-error">Please fill in all fields</h4>}
        {showForm && (
          <NewChoreForm
            text={text}
            date={date}
            amount={amount}
            handleSubmit={handleSubmit}
            setText={setText}
            setDate={setDate}
            setAmount={setAmount}
            setError={setError}
            setShowForm={setShowForm}
          />
        )}
      </div>
      {!showForm && (
        <div className="chore-list">
          {chores.length === 0 && 'No Chores added yet'}
          {chores.map((chore, index) => (
            <Chore
              key={chore.id}
              chore={chore}
              toggleComplete={toggleComplete}
              deleteChore={deleteChore}
              confirmDelete={confirmDelete}
              moveUp={moveUp}
              moveDown={moveDown}
              index={index}
              onRename={(newName) => renameChore(index, newName)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ChoreList;
