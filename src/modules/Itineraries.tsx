import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Avatar, Layout, Menu, Dropdown, Modal } from 'antd';
import { SearchOutlined, FilterOutlined, SmileOutlined, PoundOutlined, StarOutlined, DollarOutlined, UserOutlined, ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

type Itinerary = {
  key: string;
  id: string;
  price: string;
  agent: string;
  agentLogo: string; // New property for agent logo
  rating: number;
  legs: string[]; // New property for legs
};

const Itineraries: React.FC<{ onSelect: (itinerary: Itinerary) => void }> = ({ onSelect }) => {
  const [originalItineraries, setOriginalItineraries] = useState<Itinerary[]>([]);
  const [filteredItineraries, setFilteredItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);
  const [selectedItinerary, setSelectedItinerary] = useState<Itinerary | null>(null);
  const [legs, setLegs] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('api.json'); // Cambia esto por tu endpoint real
        const data = await response.json();

        const formattedData = data.itineraries.map((itinerary: any) => ({
          key: itinerary.id,
          id: itinerary.id,
          price: itinerary.price,
          agent: itinerary.agent,
          agentLogo: itinerary.agent_logo, // Include agent logo
          rating: itinerary.agent_rating,
          legs: itinerary.legs, // Include legs
        }));

        setOriginalItineraries(formattedData);
        setFilteredItineraries(formattedData);
        setLegs(data.legs);
      } catch (error) {
        console.error('Error fetching itineraries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Actualizar búsqueda
  const handleSearch = (value: string) => {
    setSearchText(value);
    filterData(value, filterType);
  };

  // Aplicar filtros
  const handleFilter = (type: string | null) => {
    setFilterType(type);
    filterData(searchText, type);
  };

  // Lógica de filtrado
  const filterData = (search: string, filter: string | null) => {
    let filtered = [...originalItineraries];

    // Filtrar por búsqueda
    if (search) {
      filtered = filtered.filter(
        (item) =>
          item.agent.toLowerCase().includes(search.toLowerCase()) ||
          item.id.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filtrar por tipo de filtro
    if (filter === 'low_price') {
      filtered = filtered.sort((a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1)));
    } else if (filter === 'high_rating') {
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    } else if (filter === 'popular') {
      filtered = filtered.sort((a, b) => b.rating - a.rating); // Asumimos popular como mejor rating
    }

    setFilteredItineraries(filtered);
  };

  const handleRowClick = (record: Itinerary) => {
    setSelectedItinerary(record);
    onSelect(record);
  };

  const handleModalClose = () => {
    setSelectedItinerary(null);
  };

  const getLegDetails = (legIds: string[]) => {
    return legIds.map((legId) => legs.find((leg) => leg.id === legId));
  };

  const columns = [
    {
      title: 'Id Itinerary',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => (
        <span>
          <UserOutlined style={{ marginRight: 8 }} />
          {text}
        </span>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text: string) => (
        <span>
          <DollarOutlined style={{ marginRight: 8 }} />
          {text}
        </span>
      ),
    },
    {
      title: 'Agent',
      dataIndex: 'agent',
      key: 'agent',
      render: (text: string, record: Itinerary) => (
        <span>
          <Avatar src={record.agentLogo} style={{ marginRight: 8 }} />
          {text}
        </span>
      ),
    },
    {
      title: 'Agent Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (text: number) => (
        <span>
          <StarOutlined style={{ marginRight: 8 }} />
          {text}
        </span>
      ),
    },
  ];

  return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: 'white', fontSize: '24px' }}>Welcome</div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src="https://via.placeholder.com/150" />
          <span style={{ color: 'white', marginLeft: '10px' }}>Pepe Ladino</span>
        </div>
      </Header>
      <Content style={{ padding: '50px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            style={{ width: '300px' }}
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Dropdown
            overlay={
              <Menu
                onClick={(e) => handleFilter(e.key)}
                items={[
                  { key: 'popular', label: 'Most Popular', icon: <SmileOutlined /> },
                  { key: 'low_price', label: 'Price, Low to High', icon: <PoundOutlined /> },
                  { key: 'high_rating', label: 'Rate, High to Low', icon: <StarOutlined /> },
                ]}
              />
            }
          >
            <Button icon={<FilterOutlined />}>Filter</Button>
          </Dropdown>
        </div>
        <div style={{ marginBottom: '20px' }}>
          Select the itinerary from the list below
        </div>
        <Table
          dataSource={filteredItineraries}
          columns={columns}
          loading={loading}
          rowClassName={(record) => (record.id === 'It_4' ? 'highlight-row' : '')}
          pagination={false}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />
        {selectedItinerary && (
          <Modal
            title="Itinerary Legs Details"
            visible={!!selectedItinerary}
            onCancel={handleModalClose}
            footer={[
              <Button key="close" onClick={handleModalClose}>
                Close
              </Button>,
            ]}
          >
            <h3>Legs:</h3>
            {getLegDetails(selectedItinerary.legs).map((leg) => (
              <div key={leg.id} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p><strong>Departure Airport:</strong> <EnvironmentOutlined style={{ marginRight: 8 }} /> {leg.departure_airport}</p>
                  <p><strong>Arrival Airport:</strong> <EnvironmentOutlined style={{ marginRight: 8 }} /> {leg.arrival_airport}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p><strong>Departure Time:</strong> <ClockCircleOutlined style={{ marginRight: 8 }} /> {leg.departure_time}</p>
                  <p><strong>Arrival Time:</strong> <ClockCircleOutlined style={{ marginRight: 8 }} /> {leg.arrival_time}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p><strong>Stops:</strong> {leg.stops}</p>
                  <p><strong>Airline:</strong> {leg.airline_name}</p>
                </div>
                <p><strong>Duration:</strong> {leg.duration_mins} mins</p>
                <hr />
              </div>
            ))}
          </Modal>
        )}
      </Content>
    </Layout>
  );
};

export { Itineraries };
