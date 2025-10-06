import Button from '@/components/atoms/button';
import Input from '@/components/atoms/Input';
import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { forgotPassword } from '@/services/apis/modules/auth';
import { errorsMessage } from '@/libs/errors';
import { notify } from '@/utils/funtion';

interface FormValues {
  email: string;
}
interface ForgetPasswordProps {
  handleChangeForm?: (value: number) => void;
}

const ForgetPassword: React.FC<ForgetPasswordProps> = ({
  handleChangeForm,
}) => {
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Email là bắt buộc')
      .email('Email không hợp lệ')
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Tên đăng nhập không chứa kí tự đặc biệt',
      ),
  });

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const body = { email: data.email };
    setLoading(true);
    await forgotPassword(body)
      .then((data) => {
        if (data?.status) {
          notify(
            'success',
            'Gửi thông tin thành công, vui lòng kiểm tra mail để nhận mật khẩu',
            'top-center',
            4000,
          );
          setError('email', { message: '' });
          setValue('email', '');
          if (handleChangeForm) handleChangeForm(0);
        } else {
          const errors =
            errorsMessage[JSON.parse(data).message] ||
            'Đã xảy ra lỗi, vui lòng thử lại.';
          notify('error', errors, 'top-center', 5000);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log('ForgotPassword -> error:', error);
        setLoading(false);
      });
  };

  return (
    <div className="t-forget">
      <h1>Quên mật khẩu</h1>
      <form>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              label="Email"
              placeholder="Vui lòng nhập email cần lấy lại mật khẩu..."
              {...field}
              errorMessage={errors.email?.message}
            />
          )}
        />

        <div className="t-forget_signin">
          <a
            onClick={() => {
              if (handleChangeForm) handleChangeForm(0);
              setError('email', { message: '' });
              setValue('email', '');
            }}
          >
            Đăng nhập ngay
          </a>
        </div>
        <div className="t-forget_button">
          <Button
            shape="fill"
            ariaLabel="Gửi ngay thông tin"
            variant="secondary"
            loading={loading}
            onClick={handleSubmit(onSubmit)}
          >
            Gửi ngay
          </Button>
        </div>
      </form>
    </div>
  );
};
export default ForgetPassword;
