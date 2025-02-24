import { ThemeColor } from "@namada/utils";

export enum InputVariants {
  Password,
  PasswordOnBlur,
  Text,
  Textarea,
  Number,
  ReadOnlyCopy,
}

export type ComponentProps = {
  label?: string | React.ReactNode;
  error?: string | React.ReactNode;
  sensitive?: boolean;
  hint?: string | React.ReactNode;
  theme?: ThemeColor;
  hideIcon?: boolean;
  children?: React.ReactNode;
};

export type InputProps = React.ComponentPropsWithoutRef<"input">;
export type TextareaProps = React.ComponentPropsWithoutRef<"textarea">;
