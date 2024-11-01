import DealTable from '@/components/DealTable';
import SearchBar from "@/components/searchBar";
import { Button } from "@nextui-org/react";
import {Pagination, PaginationItem, PaginationCursor} from "@nextui-org/pagination";

const Home: React.FC = () => {
  
  return (
    <div className="container mx-auto p-10">
    <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-lg text-black-600 mt-2">Approve startup deals.</p>
        </div>
        <div className="flex items-center space-x-4">
            <Button style={{ backgroundColor: '#9710FF', color: '#fff' }}>
                Manage Startup
            </Button>
        </div>
    </div>
    <div className="mt-4">
        <DealTable />
    </div>
    <div className="flex justify-center mt-4">
        <Pagination showControls total={10} initialPage={1} />
    </div>
    </div>
  );
};

export default Home;