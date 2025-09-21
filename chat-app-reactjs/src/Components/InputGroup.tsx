import React from 'react';
type InvalidType = {
  name: string;
  msg: string;
};
// type formDataType ={
//   phone: string,
//     name: string,
//     email: string,
//     password: string,
//     avatar:string  }
type InputProps = {
  setIsInvalid: (val: InvalidType[]) => void;
  type: 'text' | 'password';
  labelChild: string;
  placeholder: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    typeInput: string
  ) => void;
  value: string;
  typeInput: string;
  isInvalid: InvalidType[];
};
export default function InputGroup({
  setIsInvalid,
  type,
  labelChild,
  placeholder,
  handleChange,
  value,
  typeInput,
  isInvalid,
}: InputProps) {
  console.log('typeInput', typeInput);
  console.log('isInvalid', isInvalid);

  console.log('value', value);
  // const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData((prevState ) => ({ ...prevState, [typeInput]: e.target.value }));
  // };
  const handleOnFocus = () => {
    setIsInvalid([]);
  };
  return (
    <div className=" flex flex-col mb-2">
      <label
        htmlFor={typeInput}
        className="text-left text-xl pb-[0.5rem] font-medium leading-7"
      >
        {labelChild}
      </label>
      <div>
        <input
          name={typeInput}
          type={type}
          placeholder={placeholder}
          value={value}
          onFocus={handleOnFocus}
          onChange={(e) => handleChange(e, typeInput)}
          className="h-[2.5rem] w-full py-2 px-4 mb-2 border border-primary rounded outline-none text-xl hover:border-primary_bold"
        />
      </div>
      {isInvalid.length > 0 &&
        isInvalid.some((element) => element.name === typeInput) && (
          <span className="italic text-red-500 text-center text-xl">
            {' '}
            {isInvalid.find((e) => e.name === typeInput)?.msg}{' '}
          </span>
        )}
    </div>
  );
}
