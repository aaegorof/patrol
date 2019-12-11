import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import "./styles.scss";

const FOOTER = gql`
  {
    page(id: "cGFnZTo4") {
      acf {
        telefon
        email
        partnerstvo
        pdf {
          mediaItemUrl
          title
        }
      }
    }
  }
`;

const Footer = () => {
  const { loading, data } = useQuery(FOOTER);
  const [fields, changeFields] = useState(null);

  useEffect(() => {
    if (!loading) {
      changeFields(data.page);
    }
  }, [data]);

  return (
    <footer className="footer-wrap bg-primary">
      <div className="container">
        {fields && (
          <div className="row">
            <div className="col-lg-4">
              <a
                href={fields.acf.pdf.mediaItemUrl}
                className="dashed"
                target="_blank"
              >
                {fields.acf.pdf.title} (PDF)
              </a>
            </div>
            <div className="col-lg-4 footer-contacts">
              <a href={`mailto:${fields.acf.email}`} className="footer-email">
                {fields.acf.email}
              </a>
              <a href={`tel:${fields.acf.telefon}`} className="footer-phone">
                {fields.acf.telefon}
              </a>
            </div>
            <div className="col-lg-4 text-right">
              <span style={{ opacity: 0.5 }}>{fields.acf.partnerstvo}</span>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};
export default Footer;
