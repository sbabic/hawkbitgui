import React, { FormHTMLAttributes } from 'react';
import styles from './styles.module.scss';

type FormProps = FormHTMLAttributes<HTMLFormElement>;

export default function Form(props: FormProps) {
  const { children, ...rest } = props;

  return (
    <form className={styles.formContent} {...rest}>
      {children}
    </form>
  );
}
