import { useEffect, useState } from "react";
import { Container, Text, VStack, Spinner, Box, Link, Heading } from "@chakra-ui/react";

const Index = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://hn.algolia.com/api/v1/search?query=react")
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.hits);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="xl">Hacker News Client</Heading>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          articles.map((article) => (
            <Box key={article.objectID} p={4} borderWidth="1px" borderRadius="lg" width="100%">
              <Link href={article.url} isExternal>
                <Text fontSize="xl" fontWeight="bold">
                  {article.title}
                </Text>
              </Link>
              <Text fontSize="md">Author: {article.author}</Text>
              <Text fontSize="sm">Comments: {article.num_comments}</Text>
            </Box>
          ))
        )}
      </VStack>
    </Container>
  );
};

export default Index;