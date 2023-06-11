import React, { Component } from 'react';
import { Button, Carousel, Typography } from 'antd';
// import 'antd/dist/antd.css';

const { Title, Paragraph } = Typography;

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <div>
      {/* Carousel for top banner images */}
      

      {/* Application description */}
      <div style={{ padding: '2em' }}>
        <Title>Your Vehicle Rental Application</Title>
        <Paragraph>
          A quick and easy way to rent vehicles online. Choose from a wide range of vehicles, compare prices and features, and make your booking in just a few clicks.
        </Paragraph>

        {/* CTA Button */}
        <Button type="primary" size="large">Get Started</Button>
      </div>

      {/* Application Features */}
      <div style={{ padding: '2em' }}>
        <Title level={2}>Features</Title>
        <Paragraph>
          <ul>
            <li>Wide variety of vehicles</li>
            <li>Compare prices and features</li>
            <li>Secure online payment</li>
            <li>24/7 customer support</li>
          </ul>
        </Paragraph>
      </div>

      {/* Footer */}
      <div style={{ backgroundColor: '#f0f2f5', padding: '1em' }}>
        <Title level={4}>Contact Us</Title>
        <Paragraph>
          If you have any questions, feel free to reach out to us at support@vehiclerentalapp.com
        </Paragraph>
      </div>
    </div>
      
      </div>
    );
  }
}
