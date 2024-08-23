import * as React from 'react'

interface ButtonProps {
    children: React.ReactNode;
}

const Button = ({
    children,
}: ButtonProps) => {
    return <button>{children}</button>
}

export { Button }
export type { ButtonProps }
