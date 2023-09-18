/* eslint-disable react/prop-types */
const Total = ({ sum }) => {
    const totalExercises = sum.reduce((acc, current) => acc + current.exercises, 0);
    return (
        <div>
            Total of {totalExercises} exerises
        </div>
    )
}

export default Total;