import React, { useEffect, useState } from 'react'
import {
  Typography,
  Table,
  Button,
  Collapse,
  Form,
  Modal,
  Input
} from 'antd'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllParticipants,
} from '../../reducers/participantsReducer'
import { useParams } from 'react-router-dom'

import Spinner from '../../components/Spinner'
import { baseURLref } from '../../constants/bnReference'


const CourseParticipants = () => {
  const dispatch = useDispatch()
  const { courseId } = useParams()
  
const [editModalActive, setEditModalActive] = useState(true)
const [form] = Form.useForm()


  const participants = useSelector((state) => state.courseParticipants.data)
  const loading = useSelector((state) => state.courseParticipants.loading)
  const user = useSelector((state) => state.auth.user)
  const courses = useSelector((state) => state.courses.data)

  const course = courses.find((course) => course.id === courseId)

  console.log(course, user)

  useEffect(() => {
    dispatch(getAllParticipants(courseId))
  }, [courseId, dispatch])

  if (loading) return <Spinner size="large" />

  const handleCancel = () => {
    setEditModalActive(false)
  }


  const handleSubmit = async () => {
    const data = form.getFieldValue()
    try {
      const response = await axios.post(`${baseURLref}/courses/${courseId}/enroll-email`, data)
      if (response.status !== 200) {
        alert("error")
      } else {
        setEditModalActive(false)
      }
    } catch (error) {
      console.log(error)
      alert(error.response.data.error)
    }
  }




  return (
    <div>
    <Modal
      title="Enroll user"
      visible={editModalActive}
      onOk={handleSubmit}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      ]}
    >
      <Form
        name="edit Module"
        form={form}
        // onFinish={editModule}
        requiredMark={false}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <Form.Item
          name="email"
          label="Student email"
          rules={[
            {
              required: true,
              message: 'Please enter student email'
            }
          ]}
        >
          <Input placeholder="Email.." />
        </Form.Item>
      </Form>
    </Modal>
    <Collapse
      style={{
        borderRadius: '10px',
        width: '100%',
        fontSize: '16px',
        border: '0px'
      }}
      defaultActiveKey={['1']}
      expandIconPosition={'left'}
    >
      
    </Collapse>
  </div>
    )
}

export default CourseParticipants

