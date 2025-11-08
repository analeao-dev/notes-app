import type { CSSProperties } from 'react';
import { BarLoader } from 'react-spinners';

interface SpinnerProps {
    color?: string;
    width?: string;
    height?: string;
    override?: CSSProperties;
}

const overrides = {
    display: 'block',
    margin: '0 auto 50px auto'
}

const Spinner = ({ color = 'blue', override = overrides }: SpinnerProps) => {
    return (
        <div>
            <BarLoader color={color} cssOverride={override} />
        </div>
    );
}

export default Spinner;