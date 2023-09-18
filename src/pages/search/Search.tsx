type Props = {};
import './Search.scss'

export default function Search({}: Props) {
    return (
        <div className="Search">
            <h1>
                Clima<span>Cast</span>
            </h1>
            <p>Enter below the place you want to know the weather of or select an option from dropdown</p>
            <div className="input">
                <input type="text" name="" id="" />
                <button>search</button>
            </div>
        </div>
    );
}
