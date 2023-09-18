/* eslint-disable react/prop-types */
const Total = ({ sum }) => {
    console.log(sum)
    const totalExercises = sum[0].exercises + sum[1].exercises + sum[2].exercises;
    return (
        <div>
            Total of {totalExercises} exerises
        </div>
    )
}

export default Total;