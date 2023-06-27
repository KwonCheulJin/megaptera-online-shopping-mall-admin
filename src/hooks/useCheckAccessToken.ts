import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import useAccessToken from './useAccessToken';

import { apiService } from '../services/ApiService';

export default function useCheckAccessToken(): boolean {
  // Access Token 검증이 끝나면 ready가 된다.
  const [ready, setReady] = useState(false);

  const { accessToken, setAccessToken } = useAccessToken();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        await apiService.fetchCurrentUser();
        setReady(true); // 👈 확인됨!
      } catch (e) {
        setAccessToken('');
      }
    };

    fetchCurrentUser();
  }, [accessToken, setAccessToken]);

  // 기존과 다른 부분 —---------
  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  return ready;
}
