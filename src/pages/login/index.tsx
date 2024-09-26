import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Checkbox, InputGroup, Message, Text, useToaster } from 'rsuite';
import Button from 'rsuite/Button';
import ButtonToolbar from 'rsuite/ButtonToolbar';
import Form from 'rsuite/Form';
import Schema from 'rsuite/Schema';

import { decrypt, encrypt } from '@helpers/encryptor.helper';
import { LocalStorage } from '@libraries/storage';
import { useApp } from '@providers/app.provider';
import { useAuthLoginMutation } from '@resources/gql/auth.gql';

import PageTitle from '@components/page-title/page-title.component';
import { useToast } from '@hooks/useToast';

import style from './style.module.less';

const LoginPage: React.FC = () => {
  const { setToken, setUser } = useApp();
  const toaster = useToaster();

  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [formError, setFormError] = useState<any>({
    email: '',
    password: '',
  });
  const [formValue, setFormValue] = useState<any>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const [authLogin, { data: logData, loading: logLoading, error: logError }] = useAuthLoginMutation();
  const toast = useToast();
  const formRef = useRef<any>();

  const model = Schema.Model({
    email: Schema.Types.StringType().isEmail(`Please enter a valid email address.`).isRequired(`Email is required`),
    password: Schema.Types.StringType().isRequired(`Password is required`),
  });

  const onSubmit = () => {
    if (!formRef.current.check()) {
      toast.error(formError);

      return;
    }

    const { email, password } = formValue;
    if (rememberMe) {
      const encryptedCredentials = encrypt({ email, password });

      LocalStorage.setItem('user_credentials', encryptedCredentials);
    } else {
      LocalStorage.removeItem('user_credentials');
    }

    authLogin({ email, password });
  };

  // handle login
  useEffect(() => {
    if (logError) {
      toast.error(logError);
    }

    if (logData) {
      const { access_token: token, user } = logData;

      if (token) {
        setToken(token);
        setUser(user);

        toaster.push(
          <Message type="success" showIcon>
            {`Welcome ${user.name}`}
          </Message>,
          { placement: 'topEnd' },
        );
      }
    }
  }, [logLoading, logError, logData]);

  // handle remember me
  useEffect(() => {
    const userCredentials: any = LocalStorage.getItem('user_credentials');

    if (userCredentials) {
      const decryptedCredentials: any = decrypt(userCredentials);

      setFormValue({ email: decryptedCredentials.email, password: decryptedCredentials.password });
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="flex flex-col w-[80%] items-center justify-center">
      <PageTitle title="Sign In" />
      <div className="flex flex-col items-center w-full">
        <img src="/images/logo/logo-with-text.svg" alt="logo" className="self-start mb-5" />
        <h3 className={style.title}>Sign In</h3>
      </div>
      <div className="flex flex-col w-full">
        <Form
          ref={formRef}
          fluid
          model={model}
          formValue={formValue}
          onCheck={setFormError}
          onChange={(formValue) => setFormValue(formValue)}
        >
          <Form.Group>
            <Form.ControlLabel>
              <Text>Email</Text>
            </Form.ControlLabel>
            <Form.Control className="w-full" name="email" />
          </Form.Group>
          <Form.Group className="mt-6">
            <Form.ControlLabel>
              <Text>Password</Text>
            </Form.ControlLabel>
            <InputGroup inside>
              <Form.Control name="password" type={showPassword ? 'text' : 'password'} autoComplete="off" />
              <InputGroup.Addon className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <div className="i-heroicons:eye-slash" /> : <div className="i-heroicons:eye" />}
              </InputGroup.Addon>
            </InputGroup>
          </Form.Group>
          <Form.Group className="flex items-start justify-between">
            <Checkbox
              name="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="remember-check"
            >
              <Text>Remember Me</Text>
            </Checkbox>
            <Button appearance="subtle" className={style.buttonForgot} onClick={() => navigate('/forgot-password')}>
              <Text>Forgot Password</Text>
            </Button>
          </Form.Group>
          <Form.Group>
            <ButtonToolbar>
              <Button
                type="submit"
                appearance="primary"
                onClick={onSubmit}
                loading={logLoading}
                disabled={Object.keys(formValue).length === 0 || logLoading || !formValue.email || !formValue.password}
                className="w-full"
              >
                Sign In
              </Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
