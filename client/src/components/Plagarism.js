import React ,{useState} from 'react'
import Resemble from 'resemblejs';

const Plagarism = () => {
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [comparisonResult, setComparisonResult] = useState(null);

    const handleImageUpload = (e, setImage) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const compareImages = () => {
        if (image1 && image2) {
            Resemble(image1).compareTo(image2).onComplete((data) => {
                setComparisonResult(data);
            });
        }
    };
    console.log(comparisonResult)
    return (
        <div className="App">
            <h1>Image Comparison</h1>
            <div>
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setImage1)} />
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setImage2)} />
            </div>
            <button onClick={compareImages}>Compare</button>
            {comparisonResult && (
                <div>
                    <h2>Comparison Result</h2>
                    <img src={comparisonResult.getImageDataUrl()} alt="Comparison Result" />
                    <p>Mismatch Percentage: {comparisonResult.misMatchPercentage}%</p>
                </div>
            )}
        </div>
    );
}

export default Plagarism
