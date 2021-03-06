import React from 'react';

export interface Props {
  content: string;
  onComplete: (value: string) => void;
}

export const EditableDiv: React.FC<Props> = ({ content, onComplete }) => {
  const [isInEditMode, setIsInEditMode] = React.useState(false);

  const [value, setValue] = React.useState(content);

  const cancelEdit = () => {
    setValue(content);
    setIsInEditMode(false);
  };

  const handleEditComplete = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const isEmptyValue = !value;
    const isTheSameValue = value === content;

    if (event.key === 'Enter' && !isTheSameValue && !isEmptyValue) {
      onComplete(value);
      setIsInEditMode(false);
    }

    if (event.key === 'Escape') {
      cancelEdit();
    }
  };

  return (
    <div>
      {!isInEditMode ? (
        <div className='content--test' onDoubleClick={() => setIsInEditMode(true)}>
          {content}
        </div>
      ) : (
        <input
          autoFocus
          value={value}
          onKeyDown={handleEditComplete}
          onChange={(e) => setValue(e.target.value)}
          onBlur={cancelEdit}
        />
      )}
    </div>
  );
};
