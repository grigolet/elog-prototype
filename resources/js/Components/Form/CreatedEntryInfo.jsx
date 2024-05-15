import NotificationInfo from "./NotificationInfo";

function CreatedEntryInfo({ entry }) {
    const createdHtml = (
        <a
            className="text-primary-600 hover:text-primary-400 underline"
            href={"/entries/" + entry.id}
        >
            Entry {entry.id} created.
        </a>
    );
    return <NotificationInfo content={createdHtml} />;
}

export default CreatedEntryInfo;
