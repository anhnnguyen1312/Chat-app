import React, { useState, useEffect } from 'react';
import { InputGroup, Button, LoadingTest } from '../Components';
import '../index.css';
import { useNavigate, useLocation } from 'react-router-dom';
import swal from 'sweetalert';
import { CometChatUIKit } from '@cometchat/chat-uikit-react';
import { database } from '../FireBase/config';
import { ref, set } from 'firebase/database';
import validator from 'validator';
type InvalidType = {
  name: string;
  msg: string;
};

type formDataType = {
  email: string;
  password: string;
  confirmPassword: string;
  avatar: string;
};
type LoginProps = {
  cometChat: boolean;
};
export default function Login({ cometChat }: LoginProps) {
  const useLocate = useLocation();
  const [isResgister, setIsRegister] = useState<boolean>(
    useLocate.state?.stateIsRegister
  );

  const [isInvalid, setIsInvalid] = useState<InvalidType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<formDataType>({
    email: '',
    password: '',
    confirmPassword: '',
    avatar:
      'https://asset.cloudinary.com/dx3nwkh2i/7d1e9bf5e5c43ab5b11b4e0040ee34b9',
  });
  const navigate = useNavigate();
  useEffect(() => {
    setIsRegister(useLocate.state?.stateIsRegister);
  }, [useLocate.state?.stateIsRegister]);

  const validate = (formData: formDataType) => {
    let isInvalidCount = true;
    for (let i in formData) {
      const key = i as keyof formDataType;

      if (formData[key] === '' && key !== 'confirmPassword') {
        setIsInvalid((prevState) => [
          ...prevState,
          {
            name: i,
            msg: `Please enter your ${i}`,
          },
        ]);
        isInvalidCount = false;
      }
      if (i === 'password' && isResgister) {
        const resultValidatePassword = validator.isStrongPassword(formData[i]);
        if (!resultValidatePassword) {
          setIsInvalid((prevState) => [
            ...prevState,
            {
              name: i,
              msg: `The password must contain at least: \n 8 characters, 1 special character, 1 lowercase letter, 1 uppercase letter`,
            },
          ]);
          isInvalidCount = false;
        }
      }
      if (i === 'email') {
        const resultValidateEmail = validator.isEmail(formData[i]);
        if (!resultValidateEmail) {
          setIsInvalid((prevState) => [
            ...prevState,
            { name: i, msg: `email không hợp lệ` },
          ]);
          isInvalidCount = false;
        }
      }

      if (i === 'confirmPassword' && isResgister) {
        if (formData[i] !== formData['password']) {
          setIsInvalid((prevState) => [
            ...prevState,
            { name: i, msg: `Passwords do not match` },
          ]);
          isInvalidCount = false;
        }
      }
    }
    return isInvalidCount;
  };

  const handleSignIn = () => {
    setIsRegister(true);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      avatar:
        'https://asset.cloudinary.com/dx3nwkh2i/7d1e9bf5e5c43ab5b11b4e0040ee34b9',
    });
    setIsInvalid([]);
  };
  const addUserToFirebase = async (userId: string, name: string) => {
    try {
      const avatarUrl = `https://i.pravatar.cc/150?u=${userId}`;
      const userRef = ref(database, `users/${userId}`);

      await set(userRef, {
        name,
        avatar: avatarUrl,
      });

      navigate('/chat-custom');
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogIn = () => {
    setIsRegister(false);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',

      avatar:
        'https://asset.cloudinary.com/dx3nwkh2i/7d1e9bf5e5c43ab5b11b4e0040ee34b9',
    });
    setIsInvalid([]);
  };
  const handleCallRegister = () => {
    const postDataRegister = async () => {
      try {
        const urlHost = 'https://chat-app-arud.onrender.com/api/register';
        // const urlLocal = 'http://localhost:3000/api/register';

        const response = await fetch(urlHost, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (result.ok) {
          swal({
            text: 'Register successful',
            icon: 'success',
            timer: 2000,
          });

          if (cometChat) {
            //handle login comet

            await handleLoginComet(result.user.id);
          } else {
            /// handle add user to firebase
            const userId = result.user.id;
            const name = result.user.email;
            await addUserToFirebase(userId, name);
            localStorage.setItem(
              'user-chatCustom',
              JSON.stringify(result.user)
            );
          }
        } else {
          swal({
            text: result.message,
            icon: 'error',
            timer: 2000,
          });
        }
        console.log('Response:', result);
      } catch (error) {
        console.error('Post error:', error);
      }
    };
    postDataRegister();
  };
  const handleCallLogin = () => {
    let apiData = {
      email: formData.email,
      password: formData.password,
    };
    const postDataLogin = async () => {
      try {
        const urlHost = 'https://chat-app-arud.onrender.com/api/login';
        // const urlLocal = 'http://localhost:3000/api/login';

        const response = await fetch(urlHost, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(apiData),
        });

        const result = await response.json();
        console.log(result, 'result');
        if (result.ok) {
          swal({
            text: 'Login successful',
            icon: 'success',
            timer: 2000,
          });
          if (cometChat) {
            //handle login comet

            await handleLoginComet(result.user.id);
          } else {
            localStorage.setItem(
              'user-chatCustom',
              JSON.stringify(result.user)
            );

            navigate('/chat-custom');
          }
        } else {
          swal({
            text: result.message,
            icon: 'error',
            timer: 2000,
          });
        }
        console.log('Response:', result);
      } catch (error) {
        console.error('Post error:', error);
      }
    };
    postDataLogin();
  };
  const handleLoginComet = async (id: string) => {
    const cometUid = id;
    //const cometUid ="cometchat-uid-2"
    const user = await CometChatUIKit.getLoggedinUser();

    if (!user) {
      CometChatUIKit.login(cometUid)
        .then(() => {
          navigate('/'); // login xong → điều hướng sang trang chat
        })
        .catch((err) => {
          console.error('Login CometChat fail:', err);
          navigate('/login-cometChat');
        });
    } else {
      console.log('CometChat user already logged in');
      navigate('/');
    }
  };
  const handleSubmit = async () => {
    setLoading(true);

    let checkValidate = validate(formData);

    if (checkValidate) {
      if (isResgister) {
        await handleCallRegister();
      } else {
        await handleCallLogin();
      }
    }
    setLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    typeInput: string
  ) => {
    setFormData((prevState: formDataType) => ({
      ...prevState,
      [typeInput]: e.target.value,
    }));
  };
  // const handleLogout = () => {
  //   CometChatUIKit.logout().catch(console.error);
  // };
  return (
    <div className="flex w-full h-full justify-center items-center ">
      <div className="w-[30rem] min-h-28 px-6 py-8 text-center border-primary border rounded-sm m-6 self-center">
        {loading && <LoadingTest />}
        <h1 className="text-3xl font-[600] mb-[1rem]">
          {isResgister ? 'Register' : 'Login'}
        </h1>
        {isResgister ? (
          <p className="text-[1.2rem] leading-10 mb-2 mt-4 text-center font-light">
            Register now to chat with other people ❤️
          </p>
        ) : (
          <p className="text-[1.2rem] leading-10 mb-2 mt-4 text-center font-light">
            Login now to chat with other people ❤️
          </p>
        )}

        <InputGroup
          setIsInvalid={setIsInvalid}
          value={formData.email}
          handleChange={handleChange}
          typeInput={'email'}
          isInvalid={isInvalid}
          type={'text'}
          labelChild={'Email'}
          placeholder={'Email'}
        />

        <InputGroup
          setIsInvalid={setIsInvalid}
          value={formData.password}
          handleChange={handleChange}
          type={'password'}
          typeInput={'password'}
          isInvalid={isInvalid}
          labelChild={'Password'}
          placeholder={'Password'}
        />

        {isResgister && (
          <InputGroup
            setIsInvalid={setIsInvalid}
            value={formData.confirmPassword}
            handleChange={handleChange}
            type={'password'}
            typeInput={'confirmPassword'}
            isInvalid={isInvalid}
            labelChild={'confirm your password'}
            placeholder={'confirm your password'}
          />
        )}
        <Button
          bgColor={'bg-primary'}
          textColor={'text-white'}
          borderColor={'border-white'}
          onClick={handleSubmit}
          fullWidth
          hovercolor={'hover:bgColor-primary_bold'}
        >
          {isResgister ? 'Register' : 'Login'}
        </Button>

        <div className="flex justify-between mt-4 text-primary">
          {isResgister ? (
            <p
              onClick={handleLogIn}
              className="cursor-pointer text-primary hover:underline"
            >
              Login now!
            </p>
          ) : (
            <>
              <p
                onClick={handleSignIn}
                className="cursor-pointer hover:underline text-primary"
              >
                Don&apos;t have an account yet? Create one!
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
