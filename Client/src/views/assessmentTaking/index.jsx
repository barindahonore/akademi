import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Prompt } from 'react-router-dom';
import { Affix, Col, Modal, Row } from 'antd';
import SpyLogic from './components/spyLogic';
import QuestionsSection from './components/QuestionsSection';
import Spinner from '../../components/Spinner';
import { getOneSubmission } from '../../reducers/assessmentTakingReducer';
import './styles.css';

const AssessmentTaking = (props) => {
  const dispatch = useDispatch();
  const { submission, loading } = useSelector((state) => state.assessmentTaking);
  const { assessmentType } = props;
  const { courseId, assessmentId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);

  useEffect(() => {
    dispatch(getOneSubmission(courseId, assessmentId, user._id));
  }, [dispatch, courseId, assessmentId, user._id]);

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (!document.fullscreenElement && isFullScreen) {
        submitExam();
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, [isFullScreen]);

  const enterFullScreen = () => {
    document.documentElement.requestFullscreen();
    setIsFullScreen(true);
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    setIsFullScreen(false);
  };

  const requestCameraPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setHasCameraPermission(true);
    } catch (err) {
      Modal.error({
        title: 'Camera Access Required',
        content: 'You must allow camera access to start the exam.',
      });
    }
  };

  const submitExam = () => {
    // Implement your exam submission logic here
    Modal.warning({
      title: 'Exam Submitted',
      content: 'You have exited full-screen mode. Your exam has been submitted.',
      onOk: () => window.close(),
    });
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  if (loading || Object.keys(submission).length === 0) return <Spinner size="large" />;

  if (assessmentType === 'Exam') {
    if (submission.assessment.remainingTime <= 0) {
      Modal.error({
        title: 'The Exam has ended',
        onOk: () => window.close(),
      });
      return null;
    }
    if (submission.finished) {
      Modal.info({
        title: 'You already submitted',
        onOk: () => window.close(),
      });
      return null;
    }
    if (submission.assessment.status.code === 'willOpen') {
      Modal.info({
        title: "Exam didn't open yet",
        onOk: () => window.close(),
      });
      return null;
    }

    if (!isFullScreen || !hasCameraPermission) {
      return (
        <div className="exam-start-container">
          <h2>Exam Instructions</h2>
          <p>Please read the following instructions carefully before starting the exam:</p>
          <ul>
            <li>The exam will be conducted in full-screen mode.</li>
            <li>You must allow camera access for proctoring purposes.</li>
            <li>Exiting full-screen mode will automatically submit your exam.</li>
            <li>Right-clicking is disabled during the exam.</li>
          </ul>
          <button onClick={requestCameraPermission} disabled={hasCameraPermission}>
            {hasCameraPermission ? 'Camera Access Granted' : 'Allow Camera Access'}
          </button>
          <button onClick={enterFullScreen} disabled={!hasCameraPermission}>
            Start Exam in Full Screen
          </button>
        </div>
      );
    }

    return (
      <div onContextMenu={handleContextMenu}>
        <Prompt
          when={true}
          message="You can't leave during the exam. Press Cancel to return, or OK to submit your exam."
        />
        <Row>
          <Col span={20}>
            <QuestionsSection submission={submission} />
          </Col>
          <Col span={4}>
            <Affix offsetTop={10}>
              <SpyLogic
                timeRemaining={submission.assessment.remainingTime}
                examId={submission.assessment.id}
              />
            </Affix>
          </Col>
        </Row>
      </div>
    );
  }

  if (assessmentType === 'Assignment') {
    return (
      <div style={{ width: '85%', margin: '0 auto' }}>
        <QuestionsSection submission={submission} />
      </div>
    );
  }

  return null;
};

export default AssessmentTaking;