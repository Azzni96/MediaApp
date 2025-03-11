import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import MediaRow from '../components/MediaRow';
import {useState} from 'react';
import SingleView from '../components/SingleView';
import {useMedia} from '../hooks/apiHooks';

const Home = () => {
  const [selectedItem, setSelectedItem] = useState<
    MediaItemWithOwner | undefined
  >(undefined);

  const {mediaArray} = useMedia();

  const [isGridView, setIsGridView] = useState(true);

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  console.log(mediaArray);

  return (
    <>
      {selectedItem && (
        <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
      )}
      <button
        onClick={toggleView}
        className="mb-5 p-2 bg-blue-500 text-white rounded"
      >
        Toggle View
      </button>
      <h2 className="mt-5 mb-5 text-3xl font-bold text-gray-800">All Media</h2>
      <section
        className={`${
          isGridView
            ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            : 'flex flex-col space-y-4'
        }`}
      >
        {mediaArray.map((item) => (
          <MediaRow
            item={item}
            key={item.media_id}
            setSelectedItem={setSelectedItem}
          />
        ))}
      </section>
    </>
  );
};
export default Home;
