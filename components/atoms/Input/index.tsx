"use client"
import { Input as AntInput } from "antd";
import React from "react";
import { mapModifiers } from "@/utils/funtion";
import { Status } from "../rangepicker";

const { TextArea, Search, Password, OTP: Otp } = AntInput;

interface IInputProps {
    id?: string;
    name?: string;
    rows?: number;
    value?: string;
    label?: string;
    loading?: boolean;
    maxLength?: number;
    disabled?: boolean;
    className?: string;
    OTPLength?: number;
    allowClear?: boolean;
    autoFocus?: boolean;
    isRequired?: boolean;
    placeholder?: string;
    defaultValue?: string;
    enterButton?: string | React.ReactNode;
    onSearch?: () => void;
    errorMessage?: string;
    suffix?: string;
    addonAfter?: React.ReactNode;
    OTPSize?: "small" | "middle" | "large";
    addonBefore?: React.ReactNode | string;
    status?: Status;
    variant?: "outlined" | "borderless" | "filled";
    autoSize?: boolean | { minRows?: number; maxRows?: number };
    type?: "default" | "textarea" | "search" | "password" | "otp";
    onPressEnter?: () => void;
    onChange?: (event: any) => void;
    formatter?: (value: string) => string;
    isHiddenPassword?: boolean;
}

const Input: React.FC<IInputProps> = ({
    type,
    onChange,
    addonBefore,
    placeholder,
    autoSize,
    variant = "outlined",
    status,
    disabled = false,
    loading = false,
    defaultValue,
    value,
    className,
    onPressEnter,
    onSearch,
    OTPLength,
    formatter,
    OTPSize,
    allowClear = true,
    autoFocus,
    errorMessage,
    label,
    isRequired,
    rows,
    maxLength,
    addonAfter,
    suffix,
    id,
    name,
    enterButton = "Search"
}) => {
    const inputClassName = mapModifiers("a-input", className, type, status, errorMessage?.trim() ? 'error' : '');
    const inputStyle = {
        ...(status === "error" ? { borderColor: "red", borderWidth: 1 } : {}),
    };
    const props = {
        id: id,
        name: name,
        autoFocus: autoFocus,
        placeholder: placeholder,
        variant: variant,
        status: errorMessage ? "error" : status,
        disabled: disabled,
        defaultValue: defaultValue,
        value: value,
        allowClear: allowClear,
        onPressEnter: onPressEnter,
        onChange: onChange,
        onSearch: onSearch,
    };

    const renderInput = () => {
        switch (type) {
            case "textarea":
                return (
                    <TextArea
                        autoSize={autoSize}
                        showCount={false}
                        style={{ ...inputStyle, resize: "none" }}
                        rows={rows}
                        maxLength={maxLength}
                        {...props}
                    />
                );
            case "search":
                return (
                    <Search
                        addonBefore={addonBefore}
                        enterButton={enterButton}
                        size="large"
                        loading={loading}
                        {...props}
                        onSearch={onSearch}
                    />
                );
            case "password":
                return (
                    <Password
                        {...props}
                        allowClear={false}
                    />
                );
            case "otp":
                return (
                    <Otp
                        length={OTPLength}
                        formatter={formatter}
                        size={OTPSize}
                        {...props}
                    />
                );
            default:
                return (
                    <AntInput
                        style={inputStyle}
                        addonAfter={addonAfter}
                        addonBefore={addonBefore}
                        suffix={suffix}
                        {...props}
                    />
                );
        }
    };

    return (
        <div className={inputClassName}>
            <label>
                {label}
                {isRequired && (
                    <span
                        style={{
                            color: "#f00",
                        }}>
                        *
                    </span>
                )}
            </label>
            {renderInput()}
            {errorMessage && (
                <div className="a-input-error_message">{errorMessage}</div>
            )}
        </div>
    );
};

export default Input;
