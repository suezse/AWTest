import React, { Fragment } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Input, Icon } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import './index.less';

interface IProps extends FormComponentProps {}

interface IState {
  isShowInvite: boolean;
  isShowInviteDone: boolean;
  isSending: boolean;
  errLog: string;
}

class Invitation extends React.Component<IProps, IState> {
  state: IState = {
    isShowInvite: false,
    isShowInviteDone: false,
    isSending: false,
    errLog: '',
  };

  formItemLayout = {
    style: {
      marginBottom: 5,
    },
  };

  validateNameLength = (_: any, value: string, callback: (message?: string) => void) => {
    if (!value || value.trim().length < 3) {
      callback('Full name needs to be at least 3 characters long.');
    }
    callback();
  };

  validateCheckEmail = (_: any, value: string, callback: (message?: string) => void) => {
    const { form } = this.props;
    if (value !== form.getFieldValue('email')) {
      callback('Confirm email needs to match Email');
    } else {
      callback();
    }
  };

  dispatchParas = (para: Object) => {
    return axios({
      method: 'post',
      url: 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth',
      data: {
        ...para,
      },
    });
  };

  submit = (e: React.FormEvent) => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFields(['name', 'email', 'email2'], { force: true }, (err: any, values: any) => {
      if (err) return;
      this.setState({
        isSending: true,
        errLog: '',
      });
      const paras = {
        name: values.name,
        email: values.email,
      };
      this.dispatchParas(paras)
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            console.log(response);
            this.setState({
              isSending: false,
              isShowInvite: false,
              isShowInviteDone: true,
            });
          }
        })
        .catch(error => {
          this.setState({
            isSending: false,
            errLog: error.response.data.errorMessage,
          });
        });
    });
  };

  render() {
    const { isShowInvite, isShowInviteDone, isSending, errLog } = this.state;
    const { form } = this.props;
    return (
      <Fragment>
        <Button type="primary" onClick={() => this.setState({ isShowInvite: true })}>
          Request an invite
        </Button>
        <Modal
          title="Request an invite"
          destroyOnClose
          width={400}
          centered
          footer={null}
          maskClosable={false}
          visible={isShowInvite}
          onCancel={() =>
            this.setState({
              isShowInvite: false,
              isSending: false,
              errLog: '',
            })
          }
        >
          <Form onSubmit={this.submit}>
            <Form.Item {...this.formItemLayout}>
              {form.getFieldDecorator('name', {
                rules: [{ required: true, validator: this.validateNameLength }],
              })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Full name" />)}
            </Form.Item>
            <Form.Item {...this.formItemLayout}>
              {form.getFieldDecorator('email', {
                rules: [{ required: true, type: 'email', message: 'Email needs to be in validation format.' }],
              })(<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />)}
            </Form.Item>
            <Form.Item {...this.formItemLayout}>
              {form.getFieldDecorator('email2', {
                rules: [{ validator: this.validateCheckEmail }],
              })(
                <Input
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Confirm email"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={isSending}
                style={{ marginTop: '20px' }}
                // onClick={submit}
              >
                {isSending ? 'Sending, please wait...' : 'Send'}
              </Button>
            </Form.Item>
          </Form>
          <div className="errLog">{errLog}</div>
        </Modal>
        <Modal
          title="All done!"
          width={400}
          centered
          footer={null}
          maskClosable
          closable={false}
          visible={isShowInviteDone}
          onCancel={() =>
            this.setState({
              isShowInviteDone: false,
            })
          }
        >
          <div className="doneMsg">You will be one of the first to experience Broccoli & Co. when we launch.</div>
          <Button
            block
            onClick={() => {
              this.setState({
                isShowInviteDone: false,
              });
            }}
          >
            Ok
          </Button>
        </Modal>
      </Fragment>
    );
  }
}

export default Form.create<IProps>({})(Invitation);
