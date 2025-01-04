import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Avatar, Layout, Menu, Dropdown } from 'antd';
import { SearchOutlined, FilterOutlined, SmileOutlined, PoundOutlined, StarOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

type Itinerary = {
  key: string;
  id: string;
  price: string;
  agent: string;
  agentLogo: string; // New property for agent logo
  rating: number;
};


const Itineraries: React.FC<{ onSelect: (itinerary: Itinerary) => void }> = ({ onSelect }) => {
  const [originalItineraries, setOriginalItineraries] = useState<Itinerary[]>([]);
  const [filteredItineraries, setFilteredItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);

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
        }));

        setOriginalItineraries(formattedData);
        setFilteredItineraries(formattedData);
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

  const columns = [
    {
      title: 'Id Itinerary',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
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
        <Table
          dataSource={filteredItineraries}
          columns={columns}
          loading={loading}
          rowClassName={(record) => (record.id === 'It_4' ? 'highlight-row' : '')}
          pagination={false}
          onRow={(record) => ({
            onClick: () => {
              onSelect(record);
            },
          })}
        />
      </Content>
    </Layout>
  );
};

export { Itineraries };
