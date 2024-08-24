import LatestItem from "../LatestItem/LatestItem";

export default function Latest() {
    return (
        <section>
            <h3>Latest transactions</h3>
            <div>
                <LatestItem />
                <LatestItem />
                <LatestItem />
            </div>
        </section>
    )
}