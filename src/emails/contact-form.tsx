import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
} from '@react-email/components';

interface ContactEmailProps {
  name: string;
  email: string;
  message: string;
}

export const ContactEmail = ({ name, email, message }: ContactEmailProps) => (
  <Html>
    <Head />
    <Preview>New contact form submission from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Contact Form Submission</Heading>
        <Text style={text}>
          <strong>Name:</strong> {name}
        </Text>
        <Text style={text}>
          <strong>Email:</strong> {email}
        </Text>
        <Hr style={hr} />
        <Text style={text}>
          <strong>Message:</strong>
        </Text>
        <Section style={messageSection}>
          <Text style={messageText}>{message}</Text>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>
          This email was sent from your website's contact form.
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const h1 = {
  color: '#111827',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.25',
  padding: '0 0 10px',
};

const text = {
  color: '#111827',
  fontSize: '16px',
  lineHeight: '1.5',
};

const messageSection = {
  padding: '10px',
  backgroundColor: '#f3f4f6',
  borderRadius: '5px',
};

const messageText = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '1.5',
  whiteSpace: 'pre-wrap',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
};