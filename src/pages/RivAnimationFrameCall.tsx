import { useCallback, useEffect, useRef } from 'react';
import { Button } from '@mui/material';

/**
 * 비대면인증 호출 새 탭에서 열기 샘플 페이지
 * requestAnimationFrame 방식
 * */
export default function RivAnimationFrameCall() {
  const rivWindowRef = useRef<Window | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  /*새 탭 닫힘 감지 함수*/
  const checkWindowClosed = useCallback(() => {
    if (rivWindowRef.current?.closed) {
      console.log("새 창이 닫혔습니다!");
      rivWindowRef.current = null;
      if (animationFrameRef.current) {
        // 등록된 콜백 함수 제거
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }
    animationFrameRef.current = requestAnimationFrame(checkWindowClosed);
  }, []);

  /**
   * 새 탭 열기 함수
   * 비대면인증 Window 객체에 checkWindowClosed callback 예약등록
   * 애니메이션 프레임이 바뀌면 콜백 함수가 호출 되고,
   * 콜백함수에서 탭이 닫혀있는지 확인한다.
   * */
  const openRiv = () => {
    if (!rivWindowRef.current || rivWindowRef.current.closed) {
      // _blank 새 탭으로 열기
      rivWindowRef.current = window.open("https://qariv.hanwhalife.com", "_blank");
      if (rivWindowRef.current) {
        animationFrameRef.current = requestAnimationFrame(checkWindowClosed);
      }
    } else {
      console.log("이미 열린 새 창이 있습니다.");
      rivWindowRef.current.focus();
    }
  };

  useEffect(() => {
    return () => {
      // 페이지 이동 전 콜백함수 flush 재확인
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);


  return (
    <>
      <Button onClick={openRiv}>비대면 인증 호출</Button>
    </>
  );
}
