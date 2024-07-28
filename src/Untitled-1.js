  // const [data, setData] = useState({});
  let weatherData = {}

  useEffect(() => {
    async function fetchInitialData() {
      const url = "https://weatherapi-com.p.rapidapi.com/current.json?q=purnia";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "c861f2f2f8mshf2e3969478b443cp1ee1dfjsneb5a026a3dd0",
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();

        const {location: {name, region}} = result
        weatherData = {
          city: name,
          cityRegion: region
        }
        console.log(weatherData)
      } catch (error) {
        console.error(error);
      }
    };

    fetchInitialData();
  }, []);

  const fetchData = async () => {
    const url = "https://weatherapi-com.p.rapidapi.com/current.json?q=purnia";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "c861f2f2f8mshf2e3969478b443cp1ee1dfjsneb5a026a3dd0",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      // setData(result);
      // console.log(result);
    } catch (error) {
      console.error(error);
    }
  };