import { useDispatch } from 'react-redux';
import { deleteGoal } from '../features/goals/goalSlice';
import { useState } from 'react';
import { updateGoal } from '../features/goals/goalSlice';
import { getGoals } from '../features/goals/goalSlice';
function GoalItem({ goal }) {
  const dispatch = useDispatch();
  const [isEdited, setIsEdited] = useState(false);
  const [updatedText, setUpdatedText] = useState(goal.text);
  const onTextChange = (e) => {
    setUpdatedText(e.target.value);
  };

  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>

      {isEdited ? (
        <form>
          <div className="form-group">
            <input
              type="text"
              value={updatedText}
              name="updatedText"
              id="updatedText"
              onChange={onTextChange}
            />
          </div>
        </form>
      ) : (
        <h2>{goal.text}</h2>
      )}
      <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">
        X
      </button>
      <div className="form-group-btn">
        <button
          className="btn"
          onClick={() => {
            if (isEdited) {
              dispatch(updateGoal({ text: updatedText, id: goal._id }));
            }
            setIsEdited(!isEdited);
          }}
        >
          {!isEdited ? 'Edit' : 'Confirm'}
        </button>
      </div>
    </div>
  );
}

export default GoalItem;
