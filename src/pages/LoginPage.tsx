import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import useLoginFormStore from '../hooks/useLoginFormStore';
import LoginForm from '../components/login/LoginForm';

const Container = styled.div`
  margin: 5rem auto;
  width: 90%;
`;

export default function LoginPage() {
  const navigate = useNavigate();

  const [{ accessToken }, store] = useLoginFormStore();

  useEffect(() => {
    store.reset();
  }, []);

  useEffect(() => {
    if (accessToken) {
      store.reset();
      navigate('/');
    }
  }, [accessToken]);

  return (
    <Container>
      <LoginForm />
    </Container>
  );
}
