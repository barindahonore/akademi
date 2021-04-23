import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Typography, Button, Modal, Form, Input, List } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { FlexSectionHeader } from '../style'

import { STUDENT } from '../../constants/userRoles'
import ModuleList from './components/ModuleList'

import {
  getAllModules,
  createModule,
  updateModule,
  deleteModule,
  createModuleItem,
  deleteModuleItem
} from '../../reducers/moduleReducer'

const Modules = (props) => {
  const { Title } = Typography

  const user = useSelector((state) => state.auth.user)
  const modules = useSelector((state) => state.modules)

  const { courseId } = props.match.params

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllModules(courseId))
  }, [courseId, dispatch])

  const addModule = (module) => {
    dispatch(createModule(courseId, module))
  }

  const editModule = (moduleId, module) => {
    dispatch(updateModule(courseId, moduleId, module))
  }

  const removeModule = (moduleId) => {
    dispatch(deleteModule(courseId, moduleId))
  }

  const addModuleItem = (moduleId, moduleItem) => {
    dispatch(createModuleItem(courseId, moduleId, moduleItem))
  }

  const removeModuleItem = (moduleId, moduleItemId) => {
    dispatch(deleteModuleItem(courseId, moduleId, moduleItemId))
  }

  const [addModalActive, setAddModalActive] = useState(false)
  const [form] = Form.useForm()

  const handleCancel = () => {
    setAddModalActive(false)
  }

  return (
    <React.Fragment>
      <FlexSectionHeader>
        <Title level={3}>Modules</Title>
        {user && user.role !== STUDENT && (
          <Button
            onClick={() => setAddModalActive(true)}
            type="dashed"
            shape="round"
            icon={<PlusOutlined />}
          >
            Add Module
          </Button>
        )}
      </FlexSectionHeader>

      <Modal
        title="Add New Module"
        visible={addModalActive}
        onOk={form.submit}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={form.submit}>
            Submit
          </Button>
        ]}
      >
        <Form
          name="add Module"
          form={form}
          onFinish={addModule}
          requiredMark={false}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item
            name="title"
            label="Course Module"
            rules={[
              {
                required: true,
                message: 'Please enter the module name'
              }
            ]}
          >
            <Input placeholder="Module Name" />
          </Form.Item>
        </Form>
      </Modal>

      <div style={{ marginTop: '16px' }}>
        <List
          dataSource={modules}
          renderItem={(module) => (
            <List.Item>
              <ModuleList
                module={module}
                instructorAccess={user.role !== STUDENT}
                editModule={(updatedModule) =>
                  editModule(module.id, updatedModule)
                }
                removeModule={removeModule}
                addModuleItem={(moduleItem) =>
                  addModuleItem(module.id, moduleItem)
                }
                removeModuleItem={(moduleItemId) =>
                  removeModuleItem(module.id, moduleItemId)
                }
              />
            </List.Item>
          )}
        />
      </div>
    </React.Fragment>
  )
}

export default Modules