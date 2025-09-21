import React, { useState, useEffect } from 'react';
import { InputGroup, Button, LoadingTest } from '../Components';
import '../index.css';
import { useNavigate, useLocation } from 'react-router-dom';
import swal from 'sweetalert';

import validator from 'validator';
import { CometChatUIKit } from '@cometchat/chat-uikit-react';
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
export default function Login() {
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
  // useEffect(() => {
  //   if (stateAuth.isLoggedIn) {
  //     swal({
  //       text: stateAuth.msg,
  //       icon: "success",
  //       timer: 2000,
  //     });
  //     stateAuth.data.role === "1"
  //       ? usenavi(`system/manage-post-system`)
  //       : usenavi(`${path.HOME}`);
  //   }
  // }, [stateAuth.isLoggedIn]);

  // useEffect(() => {
  //   if (stateAuth.msg) {
  //     if (!stateAuth.isLoggedIn && !stateAuth.isLoggedOut) {
  //       swal({
  //         text: stateAuth.msg,
  //         icon: "error",
  //         timer: 2000,
  //       });
  //     }
  //   }
  // }, [stateAuth.msg, stateAuth.update]);

  // useEffect(() => {
  //   stateAuth.isCheckedEmail == "checked"
  //     ? swal({
  //         text: stateAuth.msg,
  //         icon: "success",
  //         timer: 2000,
  //       })
  //     : stateAuth.isCheckedEmail == "unChecked" &&
  //       swal({
  //         text: stateAuth.msg,
  //         icon: "error",
  //         timer: 2000,
  //       });
  // }, [stateAuth.isCheckedEmail]);

  const validate = (formData: formDataType) => {
    let isInvalidCount = true;
    for (let i in formData) {
      const key = i as keyof formDataType;

      if (formData[key] === '' && key !== 'confirmPassword') {
        // console.log( key,key =="confirmPassword")
        setIsInvalid((prevState) => [
          ...prevState,
          { name: i, msg: `bạn chưa nhập` },
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
              msg: `mật khẩu phải có ít nhất: \n 8 kí tự, 1 kí tự đặc biệt, 1 chữ thường, 1 chữ in hoa`,
            },
          ]);
          isInvalidCount = false;
        }
      }
      if (i === 'confirmPassword' && isResgister) {
        if (formData[i] !== formData['password']) {
          setIsInvalid((prevState) => [
            ...prevState,
            { name: i, msg: `Mật khẩu xác nhận không đúng` },
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
        const response = await fetch('http://localhost:3000/api/register', {
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

          handleLoginComet(result.user.id);
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
        console.log('fetch ne');
        const response = await fetch('http://localhost:3000/api/login', {
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
          await handleLoginComet(result.user.id);
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

    const user = await CometChatUIKit.getLoggedinUser();

    if (!user) {
      CometChatUIKit.login(cometUid)
        .then(() => {
          navigate('/'); // login xong → điều hướng sang trang chat
        })
        .catch((err) => {
          console.error('Login CometChat fail:', err);
          navigate('/login');
        });
    } else {
      console.log('CometChat user already logged in');
      navigate('/');
    }
  };
  const handleSubmit = async () => {
    console.log('submit click');
    setLoading(true);

    let checkValidate = validate(formData);

    if (checkValidate) {
      console.log('validate true');
      if (isResgister) {
        handleCallRegister();
      } else {
        handleCallLogin();
      }

      setLoading(false);
    }
    setLoading(false);
  };
  console.log('formData', formData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    typeInput: string
  ) => {
    setFormData((prevState: formDataType) => ({
      ...prevState,
      [typeInput]: e.target.value,
    }));
  };
  console.log('loading', loading);
  const handleLogout = () => {
    CometChatUIKit.logout().catch(console.error);
  };
  return (
    <div className="flex w-full h-full justify-center items-center ">
      <div className="w-[30rem] min-h-28 px-6 py-8 text-center border-primary border rounded-sm m-6 self-center">
        {loading && <LoadingTest />}
        <h1 className="text-3xl font-[600] mb-[1rem]">
          <button
            className="cursor-pointer hover:underline text-primary"
            onClick={handleLogout}
          >
            đăng xuất
          </button>
          {isResgister ? 'Đăng ký' : 'Đăng nhập'}
        </h1>
        {isResgister ? (
          <p className="text-[1.2rem] leading-10 mb-2 mt-4 text-center font-light">
            Register now to chat with other people ❤️
          </p>
        ) : (
          <p className="text-[1.2rem] leading-10 mb-2 mt-4 text-center font-light">
            Đăng nhập ngay để tìm được phòng ưng ý nhất ❤️
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
          placeholder={'Mời bạn nhập Email'}
        />

        <InputGroup
          setIsInvalid={setIsInvalid}
          value={formData.password}
          handleChange={handleChange}
          type={'password'}
          typeInput={'password'}
          isInvalid={isInvalid}
          labelChild={'Mật khẩu'}
          placeholder={'Mời bạn nhập Mật khẩu'}
        />

        {isResgister && (
          <InputGroup
            setIsInvalid={setIsInvalid}
            value={formData.confirmPassword}
            handleChange={handleChange}
            type={'password'}
            typeInput={'confirmPassword'}
            isInvalid={isInvalid}
            labelChild={'Xác nhận mật khẩu'}
            placeholder={'Nhập lại mật khẩu của bạn'}
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
          {isResgister ? 'Đăng ký' : 'Đăng nhập'}
        </Button>

        <div className="flex justify-between mt-4 text-primary">
          {isResgister ? (
            <p
              onClick={handleLogIn}
              className="cursor-pointer text-primary hover:underline"
            >
              Đăng nhập ngay
            </p>
          ) : (
            <>
              <p
                onClick={handleSignIn}
                className="cursor-pointer hover:underline text-primary"
              >
                Bạn chưa có tài khoản?
              </p>
              <p
                // onClick={handleForgotPassword}
                className="cursor-pointer hover:underline text-primary"
              >
                Bạn quên mật khẩu ?
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
